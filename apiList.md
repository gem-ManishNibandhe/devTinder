# DevTinder API

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password //Forget passowrd API

## connectionRequest Router

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/connections
- GET /user/request/received/
- GET /user/feed - Gets you the profiles of other user on platform

Status : ignore(left swipe) ,interested(right swipe), accepted , rejected
