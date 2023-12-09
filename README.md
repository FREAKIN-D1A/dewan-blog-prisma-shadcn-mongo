```js
console.log("\n\n++--++--++--++--++--++--");
console.log("stuff ===============>");
console.log(stuff);
console.log("++--++--++--++--++--++--\n\n");
```

```bash

```

### APP_URL:

https://dewan-blog-prisma-shadcn-mongo.vercel.app/
https://dewan-blog-prisma-shadcn-mongo-freakin-d1a.vercel.app/
https://dewan-blog-prisma-shadcn-mongo-freakin-d1a.vercel.app/

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
git commit -m "commit : 00.05 " &&
git push -u origin main
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
npx shadcn-ui@latest add button card toast
```
