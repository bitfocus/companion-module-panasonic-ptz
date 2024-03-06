# companion-module-panasonic-ptz

See HELP.md and LICENSE

Current support is based on "HD/4K Integrated Camera Interface Specifications" version 1.12 from Apr. 27, 2020.
For more information on the Panasonic API, please refer to:
[Panasonic Interface Specifications, Protocol](https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/EN/top.html)

**V1.0.7**

- Added Hanging and Desktop mode
- Added One Touch Auto Focus
- Zoom and Focus speed

**V1.0.8**

- Fixed bug with changing config settings, forcing the user to disable and re-enable the module to connect again.
- Fixed bug with OTAF missing an action

**V1.0.9**

- Cleaned up "Help.md" file
- Cleaned up "Index.js" file, by splitting it up into difrent files
- Sorted Actions in dropdown
- Fixed Auto Focus Action having wrong default
- Added Feedback Structure and Support
- Added Variables Structure and Support
- Added Auto Detect Model, and the option to specify camera type
- Made Actions Model specific, with options that match the model
- Updated all presets to work with current feedbacks and actions, and is made dynamicly based on model

**V1.0.10**

- Added Basic support for AW-HE2
- Added Config option to enable PTZ debug to the "Info" and "Warn" log window
- Added Support for Start and Stop Recording on SD Card (Only some models)

**V1.0.11**

- Added support for AW-UE4

**V1.0.12**

- Hotfix for SD Card Record Action
- Bug Fix: Tally on variable, not working on integer variables, now works with both integer and string variables

**V1.0.13**

- Bug Fix: some actions not working with defaults, due too not having a default declared
- Enabled presets on Aw-HE2

**V1.0.14**

- Updated Help.md
- Fixed bug with importing unused dependencies
- Fixed bug with Auto/Manual focus being mirrored

**V1.0.15**

- Added Auto detect TCP port based on instance ID/nr, as these will always be unique on one system. Currently, it's based on the default TCP port (31004)+ instance nr. If you only have one instance = 31004 + 1, it is the fifth instance = 31004 + 5. that should help out with errors when using more than one instance/camera. (The user selected port, gets ignored when auto mode is selected)
- Cleaned up config page
- Fix bug with tally not being reported corectly in feedbacks with AW-HE40 series camera's

**V1.0.16**

- Converted Feedbacks to Boolean Feedbacks for more flexibility

**V1.0.17 & V1.0.18**

- Minor changes, and update script fixes

**V1.0.19**

- Added Action, Feedback, Preset and Variable for "Preset - Mode A, B, C"
- Fixed Tally follow variable option
- cleaned up the subscription codebase Init_tcp()
- Changed "Auto TCP" port, to be handled by node instead of an offset

**V3.0.0**

- Complete rewrite of the module with initial focus on full support for modern non-PTZ cameras
- Added support for UE80/UE50/UE40 series
- Added support for CX350/4000 series
- Added and fixed support for many other camera models by walking through lots of specs
- Added Colorbar control
- Added on-camera Autotracking features (on recent camera models like UE50)
- Added preset thumbnail as button background by feedback
- Added preset selected and completed status feedback
- Added preset memory save and clear actions
- Added nice multi-action preset memory recall/memorize/clear button presets
- Added support for rotary control actions where applicable
- Added instant command return code feedback
- Added Streaming control actions and feedbacks for SRT Caller, RTMP Client and MPEG-TS Output modes
- Added Recording control actions and feedbacks incl. SD card slot usage
- Fixed many protocol glitches and model specific data layouts
- Completly refactored camera model properties
- Add common color correction actions und variables (gain, pedestal, white balance, ...)
- Add all feedbacks for operational states
- Unified button actions for set/toggle/up/down where applicable
- Add polling of data from camera which is not included in push events
- Add inital explicit data pull from camera where bulk retrieval is not available or does report wrong data
- Add decoding of error codes
- Big rewrite of presets to hopefully better fit common production needs and allow them to change easily
- Add graphical focus/zoom/iris position bar and numeric absolute and relative position
- Add iris F-value decode on supported models
- Add absolute pan/tilt position (angle)
- Fixed firmware version retrieval
- Add camera title
- Fixed connection handling and reconnect behavior
- Add config switch and delay setting for polling
- Add Image Stabilization (O.I.S.)

...and many more things that I stumbled upon but can't remember in detail ;)


Attention:
Since this is more or less a complete rewrite of this module with clean-ups, refactoring and
is also an attempt to achieve simplification of names, variables, actions, feedback, etc., there is unfortunately no upgrade script (yet?) for automatically updating or migrating existing companion configurations.
In most cases, you will therefore have to start from scratch with your companion configuration for functions of this module. I'm very sorry, but the changes (and improvements) are too large to be migrated automatically with reasonable effort. But I also have to admit that I still don't understand enough how upgrade scripts work. Maybe someone can support me?


Testing by myself on HR140, UE50, UE150, UE100, HE40, CX350

Open things that still need to be done and others that are being worked on:
[ ] Upgrade, improve, clean and fix all Presets
[ ] Check and fix Preset buttons with two variables
[ ] Add UE80 and UE100 model properties
[ ] Double check all camera model properties and variables, action, feedback conditions
[ ] Testing, testing, testing


WORK IN PROGRESS