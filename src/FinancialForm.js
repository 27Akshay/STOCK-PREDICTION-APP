import React, { useState } from 'react'
import './FinancialForm.css';
import { FadeLoader } from 'react-spinners';

const API_KEY=process.env.REACT_APP_GEMINI_API;

const FinancialForm = ({setResult}) => {
    const [values,setValues]=useState({
        marketPrice : "50",
        eps : "32",
        bookValue : "443",
        sales : "43",
        annualDividends : '654',
        previousEps: '544',
        currentEps: '766',
        totalDebt: '54',
        totalEquity: '7654',
        netIncome: '765534'


    }) 
    const [isSent, setIsSent] = useState(true)

    const handleChange =(e)=>{
         const{name,value}=e.target;
         setValues({...values,[name]:value});
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();
        let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

        //console.log(values);
        const trainingPrompt = [
            {
                "parts": [
                    {
                        "text": "From next prompt I am gonna send you some parameters for predicting stock market share , tell me is it overvalued or undervalued , buy or not"
                    }
                ],
                "role": "user"
            },
            {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
            },
            {
                "role": "user",
                "parts": [{
                    "text": "and also calculate - P/E ratio , P/B ratio, P/S Ratio, Dividend Yield, Earnings Growth in %, Debt-to-Equity Ratio, ROE % and give as a response"
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": "always give response in form of HTML div and table tag"
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
            },
        ]
        let messagesToSend = [
            ...trainingPrompt,
            {
                "role": "user",
                "parts": [{
                  "text": JSON.stringify(values)
                }]
              } 
        ]
        setIsSent(false)
        let res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contents": messagesToSend
              })
        })
        let resjson = await res.json()
        setIsSent(true)
        let responseMessage = resjson.candidates[0].content.parts[0].text
        console.log(responseMessage)
       setResult(responseMessage)
    };
  return (
   <form className="form-container" onSubmit ={handleSubmit}>
    <div>
        <label>marketPrice per share </label>
        <input type='number' name='marketPrice' value={values.marketPrice} onChange={handleChange}/>
    </div>
    <div>
        <label>EARNING PER SHARE  </label>
        <input type='number' name='eps' value={values.eps} onChange={handleChange} required/>
    </div>
    <div>
        <label>BOOKVALUE OF SHARE </label>
        <input type='number' name='bookValue' value={values.bookValue} onChange={handleChange}/>
    </div>
    <div>
        <label>SALES per share </label>
        <input type='number' name='sales' value={values.sales} onChange={handleChange}/>
    </div>
    <div>
        <label>ANNUAL DIVIDEND  </label>
        <input type='number' name='annualDividends' value={values.annualDividends} onChange={handleChange}/>
    </div>
    <div>
        <label>PREVIOUS EPS</label>
        <input type='number' name='previousEps' value={values.previousEps} onChange={handleChange}/>
    </div>
    <div>
        <label>CURRENT EPS </label>
        <input type='number' name='currentEps' value={values.currentEps} onChange={handleChange}/>
    </div>
    <div>
        <label>Total Debt on Company  </label>
        <input type='number' name='totalDebt' value={values.totalDebt} onChange={handleChange}/>
    </div>
    <div>
        <label>TOTAL EQUITY  </label>
        <input type='number' name='totalEquity' value={values.totalEquity} onChange={handleChange}/>
    </div>
    <div>
        <label>NET INCOME  </label>
        <input type='number' name='netIncome' value={values.netIncome} onChange={handleChange}/>
    </div>
    {
                isSent ?
                <button type="submit">Submit</button>
                :
                <FadeLoader className='loader'/>

 }
   </form>
  )
}

export default FinancialForm