!--
layout: post
title: Thinking about Development
categories: programming
!--
# General

> ghogchi [3:42 PM]
> i can’t grasp complex things period (a bear of very small brain) which is why i need clean code, explicit domain models, and low-fat abstractions.

(bullets need expanding or categorization)

* Class names should not be verbs, nor should they be verbs turned into nouns. (ex `Enroller`, `UserAuthenticator`)
* Don't be clever. Clever is not obvious, and harder to read. **Always code for the reader**.
* Reading code is hard. Writing code is easy. Get better at reading code.
* Wrap third party calls (anything over the network) in their own wrapper. Don't make network calls outside of wrapper classes.
* The rule of proximity - declare variables, methods, imports, etc. as close as possible to where they are used. (exception - standards of grouping imports near the top, etc.)
* Push conditionals to the edges - out (to your public API) and in (towards the APIs you use), away from the middle.
    * If you’re writing a web service, play with the idea of making new endpoints instead of conditionals as query params
    * If you’re writing a web site, play with the idea of having two separate pages (that share components) rather than one page that has conditionals
    * If you’re writing a library, play with the idea of giving two separate functions, instead of one function that takes a flag. Downside - increases API surface area.
* Validate hard at the edges, and give good error messages. This allows you to assume a certain state of the world within your code so you can use less conditionals.
* Build just enough of your app that you can ship it, not enough that you think it’s done.
* Be consistent in your style. A style that is incorrect but consistent is better than not being consistent.
* HTTP requests will always fail. Prepare that case first. Deal with the case that it will be slow second. Deal with success last.
* Left Seat, Right Seat, Solo (Driving analogy). Watch someone do it, they watch you do it, then you do it on your own
* Configuration is Code.
* Version everything. Use paper_trail gem. Don’t do edits, destructive updates, or deletes. Create versions and archive.
* https://www.destroyallsoftware.com/screencasts/catalog

# Principles
Use cautiously.
* You Ain't Gonna Need It - https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it
* The early return - http://programmers.stackexchange.com/questions/18454/should-i-return-from-a-function-early-or-use-an-if-statement
* Tell, Don't Ask - https://pragprog.com/articles/tell-dont-ask
* Single Responsibility Principle - http://en.wikipedia.org/wiki/Single_responsibility_principle
* Single Source of Truth - http://en.wikipedia.org/wiki/Single_Source_of_Truth
  * Don’t require the same thing to be configured in different places, ever.
* Don't Repeat Yourself - https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
  * Beware over DRYing your code. Sometimes code in two places happens to look the same, but the actual business reason is different. When these business reasons diverge, if you don’t unDRY that code, you’ll add complexity to a shared place that shouldn’t be shared.
    * What are some examples?
        * Two ways that look like they do the same thing, but don’t
        * One model having two (or more) names in your system (and it isn’t though inheritance)
        * methods that don’t do what you think they do. It’s better to be ambiguously named that incorrectly named, because then people will be forced to read the code
        * Missing abstractions - two things that should have a common interface that don’t (netsuite/gp), missing models (subsidiary)

# Testing

* test from the outside in (API or capybara/cucumber first, the models). Outside tests, although the most fragile, are the ones that actually test your system. Let at least some tests go ALL the way through your system. Mocks suck.

# Standards

* http://octo-labs.github.io/snowflake/
* trust and use open standards
  * embrace them (RFCs, IEEE, language & framework idioms)
    * status codes
    * HTTP Headers
    * The Pythonic way
    * casing in different languages (underscore for Ruby, camelCase for JS and Java, kebab-case for Clojure, etc)
 * research them
* be wary of internal standards
  * question them, but accept them when it makes sense. Try to make them open if possible.

# Methods

* Small methods? Big methods when starting, pull out only when necessary. Don't be too eager to extract methods.
* Try to make as many methods idempotent and side effect free as possible.
* Pass as little information as possible into methods. The more data that is passed in, the larger the contract is. If one field of an object is needed, pass that explicitly.
* Always return the same data type/structure from a method/API (except for error cases, allow raising of exceptions through acceptable methods)
    * This is something static languages guarantee - be kind to your future self and be sensible about it. Make sure all if/else cases return the same data type/structure
    * However, don’t force two return types to be the same shape. If you need to return two different things, have two different methods/endpoints.
 * Method names should use verbs.

# Variables

* good variable names - long is better if it’s the best description.
* Don’t use abbreviations, and when you do provide a glossary.
* Never use the following variable names: attributes, hash, data, result
* Unless the variable will be persisted, don’t change it without giving it a new name. If you are changing it, give it a new, representative name. (Immutable Data)

# What is cruft?

* Cruft is code that only makes sense to the people who wrote it (and sometimes, only when that person is writing it, not a month later). When a new person looks at it, they think ‘What were they thinking?’. There’s no good argument for how it currently is other than, ‘Well, it used to be this way.’
* *Sometimes* git history will help.
* Cruft can happen from both business concerns and engineering concerns - engineers are often more likely to realize the second one than the first one
* Cruft adds mental overhead to anyone trying to understand a problem or code. It covers a business case or code path that is no longer used.

# Frameworks

* Write less code. Take pride in killing code (see cruft), the less you have to kill the better. Use a framework and save yourself the time.
* If you don’t choose a framework, you are building one whether you know it or not. Start with it in a separate repo if you want to build your own.
* Leverage frameworks.
* Learning a framework is hard.

  * Lots of concepts
  * Lots of design decisions that are opaque (don’t know why they were made)
  * Lots of classes/functions, large surface area
  * Lots of overhead - you don’t need everything, just a specific piece.

They’ve been thought out and decisions and compromises have been made. Advantage is you aren’t reinventing the wheel, disadvantage is you don’t understand why it is round.

# Simple refactors

### Example 1
```javascript
if(test === true) {
}
```
should be

```javascript
if(test) {
}
```

### Example 2
```javascript
if(test) {
  return true;
} else {
  return false;
}
```
should be

```javascript
return test; OR return !!test;
```

EXPAND .testing- classes.

# Why I dislike Mustache

Template

```
<ul>
  {{#deals}}
    <li>{{title}}</li>
  {{/deals}}
</ul>
```

Desired Output

```
<ul>
    <li>Good Deal</li>
</ul>
```

All three data structures result in the same output:

JSON 1

```
{ “deals”: [{title: “Good Deal”}] }
```

JSON 2

```
{“deals”: true, “title”: “Good Deal”}
```

JSON 3

```
{“deals”: {“title” : “Good Deal”}}
```
