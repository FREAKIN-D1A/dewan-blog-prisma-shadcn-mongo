```js
console.log("\n\n++--++--++--++--++--++--");
console.log("stuff  ======>");
console.log(stuff);
console.log("++--++--++--++--++--++--\n\n");
```

### APP_URL:

https://dewan-blog-prisma-shadcn-mongo.vercel.app/

https://dewan-blog-prisma-shadcn-mongo-freakin-d1a.vercel.app/

https://dewan-blog-prisma-shadcn-mongo-git-main-freakin-d1a.vercel.app/

```js
// config.js
export const baseUrl =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_PRODUCTION_URL
		: process.env.NEXT_PUBLIC_DEV_URL;

export const baseApiUrl = path.join(baseApiUrl, "api");
```

#### Git first upload:

```bash
git init &&
git add .  &&
git status &&
git commit -m "0th commit"  &&
git branch -M main &&
<!-- git remote add origin LINK -->
git remote add origin git@github.com:FREAKIN-D1A/dewan-blog-prisma-shadcn-mongo.git  &&
git push -u origin main
```

#### Git upload:

```bash
git add . &&
git status &&
git commit -m "commit : 01.002 " &&

git push -u origin main
git push -f origin main
```

### Prisma:

#### Prisma init:

```bash
npx prisma init
```

```js
// index.js
import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export default prisma;

export const connectToDb = async () => {
	await prisma.$connect();
};

export const disconnectFromDb = async () => {
	await prisma.$disconnec();
};
```

#### after creating the model db push:

```bash
npx prisma db push
```

### shadcn-ui:

```bash
npx shadcn-ui@latest init &&
@/shadcn/components
@/shadcn/utils
npx shadcn-ui@latest add button card toast form
```

### Dummy users:

Name: One User
email: one@test.com
password : 123456

Name: Two User
email: two@test.com
password : 123456

Name: Three User
email: three@test.com
password : 123456

Name: Four User
email: four@test.com
password : 123456

Name: Cm Punk
email: punk@test.com
password : 123456

Name: Chris Jericho
email: chris@test.com
password : 123456

Name: Kenny Omega
email: kenny@test.com
password : 123456

Name: Triple H
email: hhh@test.com
password : 123456

Name: John Cena
email: cena@test.com
password : 123456
