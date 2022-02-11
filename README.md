# Multilangauge-Handler for javascript
### A multi-language handling library to support multi-languages in your app with the simplest most optimized way.

## Usage:
This package simply uses json files to store messages. You can do that in 2 simple steps.

#### Step1 Create a directory for each language in which you will add the json files you want. The directory structure will look something like this:

```bash
├── app
    ├── language
        ├── ar
        │   ├── common.json
        │   └── user.json
        ├── en
            ├── common.json
            └── user.json
```

For example language/en/common.json file will contain:

```json
{
    "success": "Success!",
    "failed": "Sorry something went wrong!"
}
```

#### Step2 use the library:
```javascript
const {multilang} = require("multilanguage-handler");

multilang.setLang("language/en");
console.log( multilang.get('common.success') );
console.log( multilang.get('common.failed') );
```

The output for the previous code snippet is:
```
Success!
Sorry something went wrong!
```

As you see in the code all you have to do is to call the library then use "setLang" method to choose the directory.

Then use "get" method to get the message and add as a parameter in it the path to the json file separated by dots and the field's name at the end.

In ``` multilang.get('common.success') ``` you are getting the "success" field in the "common.json" file.

And don't worry. No matter how many times you use fields from a single file the library never parses the same file twice (trust me I made sure of it doesn't 😉).

You can also have subdirectories under each language directory if you want.

```bash
├── app
    ├── language
        ├── ar
        │   ├── common.json
        │   └── user
        │       └── login.json
        ├── en
            ├── common.json
            └── user
                └── login.json
```

And get your message the same way:

```javascript
const {multilang} = require("multilanguage-handler");

multilang.setLang("language/en");
console.log( multilang.get('user.login.invalid_email') );
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
