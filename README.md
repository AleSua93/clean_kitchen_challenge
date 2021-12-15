# Clean Kitchen Frontend Task

## Installing and running the app

Simply run `yarn install` followed by `yarn start` to spin up a local development server at port 3000.

## Using the app.

In the app, you first must choose a date. Once you've done that, you can choose from the available delivery times (which depend on the selected date). Finally, you can place your
order using the button, which simply logs the Order object to the console.

## Testing

### Manual

Since the orders data is mocked (taken form the `random-orders.json` file), you can select 2021-12-29 as your date to confirm that deliveries at 10:30 are not available, but you can
select either 12:30 or 18:30. There are no orders for any other date, so all times will be available in that case.

### Automated

Running `yarn test` will run the only test suite, which is focused on testing the logic for
determining the available times. I figured that this would be the most important feature to test, since it contains the most business logic. There are a lot more test cases that could be added,
but I only coded two as an example.