import { NextResponse } from 'next/server';
import axios from 'axios';

const DIFY_API_KEY = process.env.DIFY_API_KEY_SUMMARY;
const BASE_URL = 'https://api.dify.ai/v1';

export async function POST(request: Request) {

  const requestData = await request.json();

  try {
    const { data } = await axios.post(`${BASE_URL}/workflows/run`, {
      inputs: { input_text: requestData.text },
      response_mode: 'blocking',
      user: 'test-user'
    }, {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${DIFY_API_KEY}`
      }

    });

  return NextResponse.json(data.data.outputs, { status: 200 });

  } catch (error: any) {
    console.error('Error running workflow:', error)
    const errorMessage = error.response ? error.response.data : error.message;
    return NextResponse.json({ message: 'Error summarizing content:', error: errorMessage }, { status: 500 });
  }
}