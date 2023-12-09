```js
console.log("\n\n++--++--++--++--++--++--");
console.log("stuff ===============>");
console.log(stuff);
console.log("++--++--++--++--++--++--\n\n");
```

### APP_URL:

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
git commit -m "commit : 00.03 " &&
git push -u origin main
```

### Prisma:

#### Prisma init:

```bash
npx prisma init
```

#### db push:

```bash
npx prisma db push
```
