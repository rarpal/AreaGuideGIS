
/****** Object:  Table [dbo].[AreaGuide]    Script Date: 27/04/2015 23:41:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[AreaGuide](
	[ID] [int] NOT NULL IDENTITY,
	[AreaID] [varchar](10) NULL,
	[Type] [varchar](3) NULL,
	[AvgPrice] [money] NULL,
	[Rating] [tinyint] NULL,
	[Notes] [nvarchar](1000) NULL
) ON [PRIMARY]

GO

ALTER TABLE dbo.AreaGuide ADD CONSTRAINT pk_AreaGuide PRIMARY KEY (ID)
GO

SET ANSI_PADDING OFF
GO


