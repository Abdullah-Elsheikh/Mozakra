import { client } from "./chat.client.js";
export const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message,
    });

    const reply =
      completion.output[0].content[0].text ||
      "Sorry, I couldn't generate a reply.";

    res.json({ reply });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
      details: error?.message,
    });
  }
};
