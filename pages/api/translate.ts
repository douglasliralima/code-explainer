import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from "openai";
import { OpenAIStream, streamToResponse } from 'ai';


const openai = new OpenAI({
    apiKey: process.env.REACT_APP_CHATGPT_API_KEY,
});

export default async function translate(req: NextApiRequest, res: NextApiResponse) {

    const prompt = `${req.body.prompt}`;
    if (prompt.trim().length === 0) {
        res.status(400).json({
            error: {
                prompt: "Please enter a valid prompt",
            }
        });
        return;
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: prompt }
              ],
            max_tokens: 150,
            temperature: 0,
            top_p: 1,
            stream: true,
        });

        const stream = OpenAIStream(response);
        streamToResponse(stream, res, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            }
          });

    } catch (error: any) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}
