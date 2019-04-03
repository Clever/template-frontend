export class MainRoutes {
  fetchCleverWebsite = async (req, res) => {
    const resp = await fetch("https://clever.com");
    const text = await resp.text();
    return res.json(200, text);
  }
}
