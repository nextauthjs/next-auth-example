import conn from '../../../lib/db'
import format from 'pg-format';
export default async (req, res) => {
    try {
        const query = 'SELECT * FROM salesforce.food_survey_report__c'
        const result = await conn.query(
          query
        );
        res.status(200).json(result.rows).end();
      console.log( "ttt",result );
  } catch ( error ) {
    res.status(err).json({})
  }
  
  
};