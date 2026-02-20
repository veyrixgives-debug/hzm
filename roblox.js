// /api/roblox.js
export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).json({error:"Method not allowed"});

  try{
    const { usernames } = req.body;
    if(!usernames || !usernames.length) return res.status(400).json({error:"No username provided"});

    const response = await fetch("https://users.roblox.com/v1/usernames/users",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "User-Agent":"Mozilla/5.0"  // 👈 add User-Agent to bypass some blocks
      },
      body: JSON.stringify({ usernames, excludeBannedUsers:false })
    });

    if(!response.ok) return res.status(500).json({error:"Roblox API returned error"});

    const data = await response.json();
    return res.status(200).json(data);

  }catch(err){
    console.error(err);
    return res.status(500).json({error:"Server proxy failed"});
  }
}
