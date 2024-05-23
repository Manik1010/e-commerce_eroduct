import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
    try {

        // await mongoose.connect(process.env.DB_URL);
        await mongoose.connect(config.db_url as string);

        // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
        // const port = 5000;
        app.listen(process.env.PORT, () => {
            // console.log(`Example app listening on port ${process.env.PORT}`)
            console.log(`Example app listening on port ${config.port}`)
        })
    } catch (err) {
        console.log(err);
    }
    //   await mongoose.connect("mongodb+srv://apollo-flix:12345@cluster0.wfpjg4p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    // //   const uri = "mongodb+srv://<username>:<password>@cluster0.wfpjg4p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    //   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    //   const port = 5000;
    //   app.listen(port, () => {
    //     console.log(`Example app listening on port ${port}`)
    //   })
}

main()
