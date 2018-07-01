import * as pulumi from "@pulumi/pulumi";
import {Request, Response} from "@pulumi/cloud";
import * as cloud from "@pulumi/cloud-aws";

let endpoint = new cloud.API("hello-world");

// POST calls work but OPTIONS calls with Access-Control-Request-Method=POST fail with a 404 and x-amzn-ErrorType=MissingAuthenticationTokenException
endpoint.post("/", (req: Request, res: Response) => {
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({hello: 'world'});
});

// If I try manually wiring up the OPTIONS response, then I get a 502 Bad Gateway
endpoint.options("/", (req: Request, res: Response) => {
    try {
        res.status(200).setHeader('Access-Control-Allow-Origin', '*');        
    } catch (error) {
     console.log({error});
    }
});

exports.endpoint = endpoint.publish().url;