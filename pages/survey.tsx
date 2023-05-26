import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import { signIn } from "next-auth/react"

import dynamic from 'next/dynamic'
import axios from 'axios';


export default function ProtectedPage() {
  const { data: session } = useSession()
  const [content, setContent] = useState()
  const [surveylist, setSurveyist] = useState<object[]>([]);

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])



  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <h1>Access Denied</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          You must be signed in to view this page
        </a>
      </p>
      </Layout>
    )
  }

  
  function getSurveyRecord() {
    console.log('You clicked submit.');
    let data={content : "some text"};
    axios.post('/api/getsurvey', data)
    .then((response) => {
      console.log('response ====',response);
      setSurveyist(response.data);
    })
    .catch((e) => { 
        console.log('error catch ===',e)
    })
  }

  function insertSurveyRecord(){
    console.log('surveylist.length ===',surveylist.length);
    let NEXT_ID = surveylist.length+1
    let record = {
        "name": "FS-000" + NEXT_ID,
        "do_you_eat_fast_food_on_a_regular_basis__c": "Yes",
        "how_much_money_do_you_spend_on_fast_food__c": 200,
        "what_is_your_gender__c": "Male",
        "external_id__c": "FS-000" + NEXT_ID ,
        "how_old_are_you__c": "15 - 20",
        "which_of_the_following_best_characterize__c": null
      }

        axios.post('/api/sendsurvey', record)
        .then((response) => {
            console.log('response ====',response);
            getSurveyRecord();
        })
        .catch((e) => { 
            console.log('error catch ===',e)
        })

    console.log('record ===',JSON.stringify(record));
  }

  // If session exists, display content
  return (
    <Layout>
        <h1>Survey Module Page</h1>
        <button onClick={insertSurveyRecord}>Insert New Survey Record</button> <br></br>
        <button onClick={getSurveyRecord} >Get Survey</button>
        {surveylist.map((survey) => {
            return (
                <div key={survey.id}>
                    <p> Name - {survey.name} <br></br></p>  
                </div>
            );
        })}

    </Layout>
  )
}
