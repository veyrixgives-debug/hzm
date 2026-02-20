export default async function handler(req, res){
if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
try{
 const response = await fetch("https://users.roblox.com/v1/usernames/users",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify(req.body)
 });
 const data = await response.json();
 res.status(200).json(data);
}catch(err){
 res.status(500).json({error:"Roblox API failed"});
}
}
