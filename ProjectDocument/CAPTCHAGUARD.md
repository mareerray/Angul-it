### CaptchaGuard is an Angular route guard that controls which pages a user can access depending on their CAPTCHA progress:

- Allows entry to /home only if the captcha hasn't started or was aborted.

- Blocks users from reaching the result page unless the captcha is complete.

- Redirects users to the correct page based on their state (started, completed, aborted).

- Prevents bypassing the intended challenge flow by direct URL access.

Apply this guard to your important routes (/home, /captcha, /result) to keep navigation secure and logical, forcing users to complete challenges before viewing results or skipping steps

## Summary Table
| Captcha State	                | Target Route	| Allowed?	| Redirect To |
| ----------------------------- | ------------- | --------- | ----------- |
| Not started, not completed	| /home	        | Yes       |	— |
| Not started, not completed	| /captcha   	| No	    | /home |
| Not started, not completed	| /result	    | No	    | /home |
| Started, not completed	    | /captcha	    | Yes	    | — |
| Started, not completed	    | /home	        | No	    | /captcha |
| Started, not completed	    | /result	    | No	    | /captcha |
| Completed	                    | /captcha	    | No	    | /result |
| Completed	                    | /result	    | Yes	    | — |
| Completed	                    | /home	        | Yes	    | — |
| Aborted (captchaAborted = true)	| /home	| Yes	| — |
| Aborted (captchaAborted = true)	| Any other	| No	| /home |
