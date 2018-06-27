
# Jira Spotlight

Never open JIRA again to copy a ticket number, assign or complete an issue. Proof of concept Electron app for FEDEX day @ Emarsys.

# Todo

 - [x] Tray icon
 - [x] Basic UI with Vue and Vuex
 - [x] Copy ticket number on issue click
 - [x] Basic multi desktop support
 - [x] Store credentials in keychain
 - [x] Display subtasks
 - [ ] Subdomain and BoardId support or parse from JIRA board URL
 - [ ] Settings view UI
 - [ ] Keyboard support
 -----
 - [ ] Electron bundle
 - [ ] Getting started screen
 - [ ] Empty/closed sprint view
 - [ ] Error handling
 - [ ] Auto-refresh (5 min. background refresh?)
 - [ ] Show details of subtasks
 - [ ] Assign to me feature
 -----
 - [ ] Detail view
 - [ ] Issue status change support

# Setup

 - `npm i`
 - `npm run rebuild`
 - `npm run build && npm start`
 - fill `username` (email address), `password` and `url` fields
	 - url example: `https://XYZ.jira.com/rest/agile/latest/board/${yourBoardId}/issue?fields=summary,status,subtasks,assignee&jql=%20Sprint%20in%20openSprints()`
