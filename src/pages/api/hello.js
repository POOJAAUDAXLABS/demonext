// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from "../../lib/db"
export default async function handler(req, res) {
    const result = await excuteQuery({ query: "SELECT * from vin WHERE vin = ?", values: [req.query.id] })
    // query: 'INSERT INTO users (id, createdAt, email, hash, salt) VALUES(?, ?, ?, ?, ?)',
    // values: [user.id, user.createdAt.toString(), user.email, user.hash, user.salt],
    res.status(200).json(result)
}
