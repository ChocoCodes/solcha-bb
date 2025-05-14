import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // Attempt to connect to the Endpoint and get the query response as JSON
    try {
        // Query property is required
        const { query } = await req.json();
        if (!query) {
          return NextResponse.json(
            { message: 'Query property is required.' },
            { status: 400 }
          );
        }
        const result = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            })
        })
        const data = await result.json();
        return NextResponse.json({ response: data.response }, { status: 200 });
    } catch(error: unknown) {
        const err = error as Error;
        console.error("APIConnectionError: ", err.message);
        return NextResponse.json({ message: 'Error connecting to the API.', error: err.message }, { status: 500 });
    }
}