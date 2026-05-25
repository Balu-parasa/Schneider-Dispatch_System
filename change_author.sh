#!/bin/sh
export FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch -f --env-filter '
export GIT_AUTHOR_NAME="balu parasa"
export GIT_AUTHOR_EMAIL="baluparasa@gmail.com"
export GIT_COMMITTER_NAME="balu parasa"
export GIT_COMMITTER_EMAIL="baluparasa@gmail.com"
' HEAD
