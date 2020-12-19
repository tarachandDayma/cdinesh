USE [DiamondTrading]
GO

/****** Object:  View [dbo].[vw_UserCart]    Script Date: 19-12-2020 12:10:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vw_UserCart]
AS
select * from userCart WHERE PacketNo IN (
	SELECT PacketNo FroM DiamondStockMngt.dbo.vw_OnlineStock
	UNION
	SELECT PacketNo FroM DiamondStockMngt.[dbo].[vw_OnlineStock_Special_Category]
)
GO


