// api/proxy.js
export default async function handler(req, res) {
  const streamUrl = 'http://katolikusradio.hu:9000/pazmany'; // Your HTTP stream URL

  try {
    // Fetch the HTTP stream
    const streamResponse = await fetch(streamUrl);
    const streamData = await streamResponse.body;

    // Set appropriate headers
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-cache');
    
    // Pipe the stream data to the response
    streamData.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the stream.' });
  }
}
