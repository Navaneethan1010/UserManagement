----------Write a query to display the PolicyNumber, ContractStatus, Type, Premium, DeathBenefit, PolicyValue for each policy. The result should be ordered by PolicyNumber				
----------i. Policy and Benefit are in "1 to m" relationship				
----------ii. DeathBenefit should be 0 when the policy is terminated				
----------iii. PolicyValue is the summation of DeathBenefit in Policy table and CashValue in Benefit table.				
----------iv. Term policy has NO policy benefit (i.e. no CashValue). Permanent Life policy can have 1 or more benefit. CashValue should not be counted when the policy is suspended				
----------v. Consider the performance, readability and maintenance difficulties when writing the query	

--CREATE TABLE Policy(
--PolicyNumber VARCHAR(8),
--ContractStatus VARCHAR(1),
--Type VARCHAR(1),
--Premium DECIMAL(18,2),
--DeathBenefit DECIMAL(18,2)
--)
--GO

--CREATE  Table Benefit(
--PolicyNumber	VARCHAR(8),	
--BenefitNum	INT,	
--BenefitType	VARCHAR(1),
--CashValue	DECIMAL(18,2),
--)
--GO
--select * from POLIcy
--INSERT INTO POLICY (PolicyNumber,ContractStatus,Type,Premium,DeathBenefit)
--SELECT '00000001','T','P',10000.00,500000.00 UNION ALL
--SELECT '00000002','S','T',100.00,100000.00 UNION ALL
--SELECT '00000003','A','T',200.00,300000.00 UNION ALL
--SELECT '00000004','A','P',15000.00,2000000.00 UNION ALL
--SELECT '00000005','A','T',500.00,700000.00

--INSERT INTO Benefit(PolicyNumber,BenefitNum,BenefitType,CashValue)
--select '00000001',1,'B',1000000.00 union all
--select '00000001',2,'F',200000.00 union all
--select '00000001',3,'F',5000.00 union all
--select '00000004',1,'B',2000000.00 union all
--select '00000004',2,'F',500000.00 union all
--select '00000004',3,'F',100.00

			

--select * from POLIcy
--select * from Benefit
-- Below query is used to retrive policy details
SELECT pol.PolicyNumber,pol.ContractStatus,pol.Type,pol.Premium,
CASE WHEN pol.ContractStatus='T' 
THEN 0
ELSE pol.DeathBenefit END AS DeathBenefit,
CASE WHEN pol.ContractStatus='T' 
THEN 0 + ben.CashValue
ELSE pol.DeathBenefit+ben.CashValue  END AS PolicyValue
FROM Policy pol
LEFT JOIN Benefit ben on pol.PolicyNumber= ben.PolicyNumber
Order by pol.PolicyNumber