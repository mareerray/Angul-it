How to Use
Apply CaptchaGuard to the /home, /result, and /captcha routes, not just /captcha.

This ensures correct navigation and user cannot by-pass the captcha funnel.

## Summary Table
| Captcha State	| Target Route	| Allowed?	| Redirect To |
| ------------- | ------------- | --------- | ----------- |
| Not started, not completed	| /home	| Yes |	— |
| Not started, not completed	| /captcha/other	| No	| /home |
| Not started, not completed	| /other	| No	| /home |
| Started, not completed	| /captcha	| Yes	| — |
| Started, not completed	| /home	| No	| /captcha |
| Started, not completed	| /result	| No	| /captcha |
| Completed	| /captcha	| No	| /result |
| Completed	| /result	| Yes	| — |
| Completed	| /home	| Yes	| — |
