import fetch from "node-fetch";

const fetchMangas = async () => {
  const res = await fetch("https://jaiminisbox.com/reader/read/one-piece-2/en/0/965");
  const date = new Date();
  console.log(`Searched for One Piece at ${date.toLocaleString("en-US")}, nothing there yet.`);
};

export default fetchMangas;