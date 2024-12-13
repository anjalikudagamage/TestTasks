<!-- Solutions for Software Engineer Test Tasks -->

<!-- JavaScript -->

<!-- 1.1 Extend JS Date object with a method daysTo() -->

Date.prototype.daysTo = function (otherDate) {
const MS*PER_DAY = 24 * 60 \_ 60 \* 1000;
const diffInTime = otherDate.getTime() - this.getTime();
return Math.floor(diffInTime / MS_PER_DAY);
};

<!-- 1.2 Sort sales data based on Total (amount \* quantity) -->

function sortSalesData(sales) {
const salesWithTotal = sales.map((sale) => ({
...sale,
Total: sale.amount \* sale.quantity,
}));
return salesWithTotal.sort((a, b) => b.Total - a.Total);
}

<!-- 1.3 Function to project an object based on a prototype -->

function projectObject(source, prototype) {
const result = {};
for (const key in prototype) {
if (key in source) {
if (typeof prototype[key] === "object" && prototype[key] !== null) {
result[key] = projectObject(source[key], prototype[key]);
} else {
result[key] = source[key];
}
}
}
return result;
}

<!-- REST API -->

<!-- 2.1 Retrieve Free/Busy Intervals -->

<!-- Using Google Calendar API and API Key: -->

1. URL: “https://www.googleapis.com/calendar/v3/freeBusy?key=AIzaSyBYxFql6-PYdu5BH-r6-BO3it2w5pfu0Xw”
2. Method: POST
3. Request Body:
   {
   "timeMin": "2024-12-01T00:00:00Z",
   "timeMax": "2024-12-30T23:59:59Z",
   "items": [
   {
   "id": "anjalikudagamage@gmail.com"
   }
   ]
   }

4. Steps:
   - Obtain Calendar ID: “anjalikudagamage@gmail.com”.
   - Ensure Calendar is public for API key access.
   - Send the request using Postman or a REST client.

Expected Output:
{
"kind": "calendar#freeBusy",
"timeMin": "2024-12-01T00:00:00.000Z",
"timeMax": "2024-12-30T23:59:59.000Z",
"calendars": {
"anjalikudagamage@gmail.com": {
"busy": [
{
"start": "2024-12-11T18:30:00Z",
"end": "2024-12-12T18:30:00Z"
}
]
}
}
}

<!-- SQL -->

<!-- 3.1 Create Tables and Insert Data -->

<!-- Create "user" table -->

CREATE TABLE user (
id INT,
firstName VARCHAR(255),
lastName VARCHAR(255),
email VARCHAR(255),
cultureID INT,
deleted BIT,
country VARCHAR(255),
isRevokeAccess BIT,
created DATETIME
);

<!-- Insert data into "user" table -->

INSERT INTO user (id, firstName, lastName, email, cultureID, deleted, country, isRevokeAccess, created) VALUES
(1, 'Victor', 'Shevchenko', 'vs@ gmail.com', 1033, 1, 'US', 0, '2011-04-05'),
(2, 'Oleksandr', 'Petrenko', 'op@ gmail.com', 1034, 0, 'UA', 0, '2014-05-01'),
(3, 'Victor', 'Tarasenko', 'vt@gmail.com', 1033, 1, 'US', 1, '2015-07-03'),
(4, 'Sergiy', 'Ivanenko', 'sergiy@gmail.com', 1046, 0, 'UA', 1, '2010-02-02'),
(5, 'Vitalii', 'Danilchenko', 'shumko@ gmail.com', 1031, 0, 'UA', 1, '2014-05-01'),
(6, 'Joe', 'Dou', 'joe@ gmail.com', 1032, 0, 'US', 1, '2009-01-01'),
(7, 'Marko', 'Polo', 'marko@gmail.com', 1033, 1, 'UA', 1, '2015-07-03');

<!-- Create "group" table -->

CREATE TABLE groupTable (
id INT,
name VARCHAR(255),
created DATETIME
);

<!-- Insert data into "group" table -->

INSERT INTO groupTable (id, name, created) VALUES
(10, 'Support', '2010-02-02'),
(12, 'Dev team', '2010-02-03'),
(13, 'Apps team', '2011-05-06'),
(14, 'TEST - dev team', '2013-05-06'),
(15, 'Guest', '2014-02-02'),
(16, 'TEST-QA-team', '2014-02-02'),
(17, 'TEST-team', '2011-01-07');

<!-- Create "groupMembership" table -->

CREATE TABLE groupMembership (
id INT,
userID INT,
groupID INT,
created DATETIME
);

<!-- Insert data into "groupMembership" table -->

INSERT INTO groupMembership (id, userID, groupID, created) VALUES
(110, 2, 10, '2010-02-02'),
(112, 3, 15, '2010-02-03'),
(114, 1, 10, '2014-02-02'),
(115, 1, 17, '2011-05-02'),
(117, 4, 12, '2014-07-13'),
(120, 5, 15, '2014-06-15');

<!-- 3.2 Select Names of All Empty Test Groups (Group Name Starts With "TEST-") -->

SELECT name
FROM groupTable g
WHERE g.name LIKE 'TEST-%'
AND NOT EXISTS (
SELECT 1
FROM groupMembership gm
WHERE gm.groupID = g.id
);

<!-- 3.3 Select User First Names and Last Names for Users Named Victor Not in Test Groups -->

SELECT u.firstName, u.lastName
FROM user u
LEFT JOIN groupMembership gm ON u.id = gm.userID
LEFT JOIN groupTable g ON gm.groupID = g.id
WHERE u.firstName = 'Victor'
AND (g.name IS NULL OR g.name NOT LIKE 'TEST-%');

<!-- 3.4 Select Users and Groups Where User Was Created Before the Group They Are a Member Of -->

SELECT u.firstName, u.lastName, g.name
FROM user u
JOIN groupMembership gm ON u.id = gm.userID
JOIN groupTable g ON gm.groupID = g.id
WHERE u.created < g.created;
