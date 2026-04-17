# Quiz Backend

## Endpoints:

1. Create User
    - Endpoint: POST /api/users
    - Required Input / Parameter: email, full_name, password, confirm_password

2. Search All Users
    - Endpoint: GET /api/users
    - Required Input / Parameter: -

3. Roll Gacha
    - Endpoint: POST /api/gacha/:userId
    - Required Input / Parameter: userId

4. History User
    - Endpoint: GET /api/gacha/:userId 
    - Required Input / Parameter: userId

5. Kuota & Sisa Rewards
    - Endpoint: GET /api/rewards
    - Required Input / Parameter: -

6. Global History Pemenang
    - Endpoint: GET /api/rewards/global-history
    - Required Input / Parameter: -



## Endpoints Untuk Testing:

1. Reset Roll User
    - Endpoint: PUT /api/gacha/:userId
    - Required Input / Parameter: userId

2. Reset Sisa Prize
    - Endpoint: PUT /api/rewards/reset
    - Required Input / Parameter: -