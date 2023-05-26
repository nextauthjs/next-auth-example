import conn from '../../../lib/db'
import format from 'pg-format';
export default async (req, res) => {
    try {
        console.log("req nom", req.body)
        const jsonData = req.body;
        const values = Object.values(jsonData);
        console.log('values ===',values);
        const formattedValues = format('%L', values);
        console.log('formattedValues ===',formattedValues);
        const insertQuery = 'INSERT INTO salesforce.food_survey_report__c(name, do_you_eat_fast_food_on_a_regular_basis__c, how_much_money_do_you_spend_on_fast_food__c, what_is_your_gender__c,external_id__c,how_old_are_you__c,which_of_the_following_best_characterize__c) VALUES($1,$2,$3,$4,$5,$6,$7)';
        console.log('insertQuery ===',insertQuery);
        // const values = [req.body.content]
        const result = await conn.query(
            insertQuery,
            values
        );
      console.log( "ttt",result );
      res.status(200).end();
  } catch ( error ) {
      console.log( error );
      res.status(err).json({})
  }
  
  
};