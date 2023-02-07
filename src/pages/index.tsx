import { AirplaneIcon } from "@/components/AirplaneIcon";
import { LoaderIcon } from "@/components/LoaderIcon";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

export default function Home() {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response: any = await openai.createImage({
        prompt: prompt,
        n: 1, //number of images
        size: "512x512",
      });
      setImageUrl(response.data.data[0].url);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <main className="main">
        <div className="w-10/12 lg:w-7/12 mx-auto">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What type of image you want to generate?"
            />

            {loading ? <LoaderIcon /> : <AirplaneIcon />}
          </form>

          {imageUrl && (
            <div className="result">
              <img
                src={imageUrl}
                alt="AI Generate Image"
                className="mx-auto rounded-xl"
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
