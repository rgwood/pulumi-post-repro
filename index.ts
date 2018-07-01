import * as pulumi from "@pulumi/pulumi";
import {Request, Response} from "@pulumi/cloud";
import * as cloud from "@pulumi/cloud-aws";

let endpoint = new cloud.HttpEndpoint("hello-world");

// POST calls work but OPTIONS calls with Access-Control-Request-Method=POST fail with a 404 and x-amzn-ErrorType=MissingAuthenticationTokenException
endpoint.post("/", (req: Request, res: Response) => {
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({hello: 'world'});
});

// Tried manually wiring up the OPTIONS response, but I get the same result
endpoint.options("/", (req: Request, res: Response) => {
    res.status(200).setHeader('Access-Control-Allow-Origin', '*');
});

exports.endpoint = endpoint.publish().url;