!--
layout: post
title: Thinking about Gender and Sex on HTML Forms
date: 2016-09-29 -0500
categories: forms programming
!--

### tldr;

It's much more than M/F, man/woman, etc. Check out Facebook's gender selector for a good example.

## Why should you care?

Improper use of gender and sex can make people who use your software feel
uncomfortable, unwelcome, or confused on how to proceed. Often, it's just habit
that we throw it on our forms.  Sometimes, we just want to know which pronouns
to use (he/she/they). Proper use of gender and sex will help ensure the largest
market possible. To many people, these small touches are not important, but
it's a chance to impress some of your audience by recognizing a unique part of
themselves.

## Over-Eager Optimization

When I starting out programming, I learned it is important to simplify,
simplify, simplify - especially when it comes to data modeling.  What's the
least you can do to get something working, with as few branches as possible?
This is  In an early programming assignment, I started out using a boolean
column (`TRUE` for male and `FALSE` for female) to make this as efficient as
possible.  Using only one bit of information was compact, efficient, and
simple. There's a few major problems with this - implicit stereotypes and
identity erasure. But before we dive into those, is gender even what I want?

## Gender and Sex

It's possible that you might not even want gender, depending on what you're
doing.  Previously in American culture, gender and sex were analagous, but over
the last few decades they've evolved to have more distinct meanings. While in
some cultures 'sex' is an uncomfortable or less preferable word to gender, they
no longer mean the same thing.

* Sex refers to the biological and physiological characteristics that define
  men and women.
* Gender refers to the socially constructed roles, behaviours, activities, and
  attributes that a given society considers appropriate for men and women."

- [Source: World Health Organization](http://apps.who.int/gender/whatisgender/en/)

When collecting information, make sure you're asking for what you actually want.

## Pronouns

Pronouns have also become richer and more personal as language has evolved.

There are three common sets of pronouns:
* he/him/his for men
* she/her/hers for women
* they/them/theirs for gender neutral or non-binary

While there was originally some conflict against using 'they', it's become much
more common in usage. How do you know which one to use? Ask.

Consider asking about pronoun preference instead of gender or sex - it's less
complicated and less intrusive into a persons life.

## Implicit Stereotype

I started writing code using my boolean `gender` column:

```javascript
if(user.gender === true) {
  // perform actions for males
} else {
  // perform actions for females
}
```

This is an example of an implicit stereotype (also known as an implicit bias).
The male's case is the default, which makes sense to me because I'm male, and
my experience is all that I've ever experienced - and for many males, they
won't bat an eyelash.  At it's core, though, there's a problem. Being male is
`true`, and being female is `false`.  When a stereotype matches your identity,
you tend not to notice it - for example, in the tldr; I had male coming first,
which I am.  Female/Male 'seems weird' because of my implicit stereotypes.  Of
course, one just _needs_ to come first, and...

### Well when I was a kid...

This wasn't an issue that was previously talked about. Partially because even though
they existed, implicit stereotypes
[weren't defined until 1995](http://faculty.washington.edu/agg/pdf/Greenwald_Banaji_PsychRev_1995.OCR.pdf).
Gender equality has come a long way in our lifetime, but it's got a _very_ long
way to go.  Removing implicit stereotypes is a small thing that can be done to
create a more inclusive team, product, and mentality. Next time you see
something like this in your code or writing, try alphabetizing your conditional
see if it feels strange. Just try noticing it at first, and you'll start to see
implicit stereotypes are more common than one might expect.

## Identity Erasure

Imagine that you are heterosexual and you came across a form that asked for your
sexual orientation, and the options were:

* Gay
* Bisexual

If you're straight, you might think that you're not supposed to be filling out this
form, or be using the service they are providing. It feels strange to select either
of them if you don't identify with either, but you have to select one to continue.
It may feel like you have had a large part of yourself understood incorrectly.

When it comes to gender and sex, not having a large array of options leaves
people to feel like they are not welcome and don't belong. Identity erasure is
the (often unintended) act of ignoring or erasing a part of someone's identity.
It's hard to make everyone happy when it comes to this - Facebook has _71_
different gender identities to avoid this problem. Much easier is just to leave
an open text box that allows people to accurately represent themselves, with
buttons to prefill with common options.


## Other Opinions

* *I disagree morally* - If morals are a part of the product you are building,
  you should include them explicitly, not implicitly.  Let people know where
  you stand so they can support or oppose you. Example:
  [Chick-fil-A](https://en.wikipedia.org/wiki/Chick-fil-A_same-sex_marriage_controversy)
  Financially, it makes sense to not reduce your audience by forcing your moral
  positions on your potential customers. A 'live and let live' policy in this
  case is much more profitable.
* *I don't want to deal with this complexity* - It's definitely more
  complicated, but also means your model is more correct. It might be easier to
  avoid collecting this type of data all together, in which case you can
  simplify your solution by leaving gender and sex out entirely.
* *I can't target marketing without gender/sex* - I don't like professional
  sports, but since I identify as a man I get improperly targeted with sports.
  I'd bet you can think of something that you're improperly marketed simply
  based on your gender. It may be more complex, but it's definitely possible
  and can be far more accurate.


# Further Reading

* [New York Times - Facebook Customizes Gender with 50 Different Choices](http://www.nytimes.com/2014/04/06/fashion/facebook-customizes-gender-with-50-different-choices.html)
* [The Daily Beast - What Each of Facebook's 51 New Gender Options Means](http://www.thedailybeast.com/articles/2014/02/15/the-complete-glossary-of-facebook-s-51-gender-options.html)
