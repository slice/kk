# Guide

kk is a tiny "programming language" that compiles straight to BBTag. It's
designed to make writing BBTag less error-prone and prettier. The syntax is
very flexible and free-flowing.

## Installing

kk is not available on npm. Instead, you should install it directly from
GitHub:

```
npm install -g slice/kk
```

This will add the `kk` command to your system. To use it, simply pass the path
to a source file as the first argument, like: `kk file.kk`.
## Hello, world!

Much like BBTag itself, any stray strings that are not part of tag calls or the
like are directly added to the output:

```
"Hello, world!"
```

This is equivalent to the following BBTag:

```
Hello, world!
```

Compiling this `kk` code will result in blargbot outputting `Hello, world!`
as expected.

## Variables

```
a = 42
b = "world!"

"Hello, " b " The answer to life is " a "."
```

Variables are easy to define and use. Just like strings, stray "names" that
aren't part of any other expression are added to the output. Normally with
BBTag, you would have to use `{get}` to fetch the variable's contents, but the
compiler automatically does that for you here.

This compiles to:

```
{set;a;42}{set;b;world!}Hello, {get;b} The answer to life is {get;a}.
```

And outputs:

```
Hello, world! The answer to life is 42.
```

## If

### Else

### As part of a variable's value

## Key/Value Mappings
