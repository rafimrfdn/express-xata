## what is this?

this is a Express JS crud app run with Deno.

## How to use this?

1. clone the repo
2. setup a Xata database, in this repo I create a table called **User** on Xata.
2. create a `.env` file then get the value from Xata of your table, or copy from **.env-example** file from this repo
3. run with `deno run -A --watch index.ts`
4. open browser then access `localhost:3000`

## How to deploy it on dash.deno using denodeploy

1. Follow instruction on [deno site](https://docs.deno.com/deploy/manual) 
2. I run the deploy command with `~/.deno/bin/deployctl deploy --env-file=.env --project=myexpress-deno`
3. The site will run perfectly
