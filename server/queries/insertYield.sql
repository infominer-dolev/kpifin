INSERT INTO yield 
(
  ID,
  PROD_ID,
  [DATE],
  YIELD,
  STDV9,
  STDV12,
  STDV36,
  STDV60
)
VALUES (
  {{ID}},
  {{PROD_ID}},
  {{DATE}},
  {{YIELD}},
  {{[coalesce] STD_9 10}},
  {{STD_12}},
  {{STD_36}},
  {{STD_60}}
);
