Routing
-------
________________________________________________________________________________________________________
|  Route Name               | Route Path                        | Notes                                |
|---------------------------|-----------------------------------|--------------------------------------|
| index                     | /                                 | Current Vault Unlock                 |
| onboarding                | /onboarding                       | Pick First Vault (New or Existing)   |
| settings                  | /settings                         | App/Vault settings placeholder       |
| |- sub-page               | /settings/sub-page                | App/Vault settings placeholder       |
| vaults                    | /vaults                           | List of known vaults  (App Storage)  |
| |- new                    | /vaults/new                       | Create New Vault, Auto Unlock        |
| |- add                    | /vaults/existing                  | Pick existing vault                  |
| |- vault                  | /vaults/:vault_id                 | Open Vault, List Items               |
| |  |- change password     | /vaults/:vault_id/change_password | Change the current vault's password  |
| |  |- item details        | /vaults/:vault_id/item/:item_id   | Open Vault, List Items, Item Details |
--------------------------------------------------------------------------------------------------------

Features
--------

- Filter Items by Type
- Search within displayed items
- Item Details
- Secure Password generator

Components
----------

- Item List
  - Item Entry
- Item Types
  - Login
    - username
    - password
    - url
  - Secure Note
  - Credit Card
  - Identity (Optional)
  - Password
    - password
    - url
  - Bank Account (Optional)
  - Database
  - Drivers License (Optional)
  - Email Account
  - Membership (Optional)
  - Outdoor License (Optional)
  - Passport (Optional)
  - Reward Program (Optional)
  - Server
  - SSN (Optional)
  - Software License
  - Wireless Router
- Fields (copy)
  - Text
  - URL
    - Help Text: https://www.example.com
  - Email
  - Address
    - Sub Fields
      - street
      - city/town/suburb
      - province/state
      - zip/postal code
      - country
        - Auto Complete/Drop Down
  - Date
    - Datepicker (today's date)
    - yyyy-mm-dd
  - Month/Year
    - Datepicket (today's date)
    - yyyy-mm
  - One Time Password
    - Circular Progress Timer
    - Editing (focus reveals whole field)
  - password (reveal, large type)
    - password/text type
    - display 8-char password dots always
    - Editing (focus reveals whole field)
  - Phone
    - numbers only
