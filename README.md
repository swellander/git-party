# Checkpoint 3 - Express/Sequelize

This checkpoint is primarily to help us understand how well you've absorbed. Don't stress out that we will be using this checkpoint to judge you in any way except to understand how we can better help you.

To this end — and perhaps it goes without saying — we ask that you don't help each other or cheat.

## Resources

The following resources are **not** allowed:

* Existing code you've already written.
* Solution code or code from learnDot.

The following resources **are** allowed:

* Any notes you've taken so far.
* All the slide decks that we've used in class.
* Online docs and resources—but do not copy over any code.

## Things we're checking

* Express App Structures
* Express Routing and Route Methods
* Sequelize Model Configuration

## Starting

1. **Fork** this repo to your own github
* Clone your fork to your local machine.
* Make sure your Postgres database is running!
* `npm install`
* You can run `npm test` which will continuously run the test suite on file saves.
* Read through the project structure. You'll be working exclusively in `models/article.js` and  `routes/index.js`, in that order.
* Start working through the tests in `test/`.  You have to mark them as active (from pending) by changing `xit` to `it`
* `git commit` often as you make progress on the tests.

These tests include [supertest](https://github.com/visionmedia/supertest).

## IMPORTANT TIPS FOR SUCCESS

* **READ ALL COMMENTS CAREFULLY.** Specs often assume you have read the comments, and many specs have links to relevant documentation.
* After you have correctly defined the model's `title` and `content` fields, you can probably run all the remaining model and route specs in *any order* (note, not 100% guaranteed). So if you get stuck, **move on and try some other specs**.
* You should `git commit` very frequently — even for each passing spec if you like! This will prevent you from losing work.
* If you are uncertain what a spec is doing or asking of you, or you've gotten stuck, *ask for help*. We may not be able to give you any hints, but you won't know if you don't ask, and sometimes the problem is technical rather than related to the checkpoint itself.
* Please don't commit `console.log`s and other debug code.

## Submitting

As you complete each answer (or make an update), please commit the changes to the git repository.  To submit your answers:

1. `git commit -am 'submission for deadline'`
* `git push`
