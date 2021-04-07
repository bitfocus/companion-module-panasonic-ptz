# companion-module-panasonic-ptz
See HELP.md and LICENSE

Current support is based on "HD/4K Integrated Camera Interface Specifications" version 1.12 from Apr. 27, 2020.
For more information on the Panasonic API, please refer to:
[Panasonic Interface Specifications, Protocol](https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/EN/top.html)

**V1.0.7**
* Added Hanging and Desktop mode
* Added One Touch Auto Focus
* Zoom and Focus speed

**V1.0.8**
* Fixed bug with changing config settings, forcing the user to disable and re-enable the module to connect again.
* Fixed bug with OTAF missing an action

**V1.0.9**
* Cleaned up "Help.md" file
* Cleaned up "Index.js" file, by splitting it up into difrent files
* Sorted Actions in dropdown
* Fixed Auto Focus Action having wrong default
* Added Feedback Structure and Support
* Added Variables Structure and Support
* Added Auto Detect Model, and the option to specify camera type
* Made Actions Model specific, with options that match the model
* Updated all presets to work with current feedbacks and actions, and is made dynamicly based on model

**V1.0.10**
* Added Basic support for AW-HE2
* Added Config option to enable PTZ debug to the "Info" and "Warn" log window
* Added Support for Start and Stop Recording on SD Card (Only some models)

**V1.0.11**
* Added support for AW-UE4

**V1.0.12**
* Hotfix for SD Card Record Action
* Bug Fix: Tally on variable, not working on integer variables, now works with both integer and string variables

**V1.0.13**
* Bug Fix: some actions not working with defaults, due too not having a default declared
* Enabled presets on Aw-HE2

**V1.0.14**
* Updated Help.md
* Fixed bug with importing unused dependencies
* Fixed bug with Auto/Manual focus being mirrored