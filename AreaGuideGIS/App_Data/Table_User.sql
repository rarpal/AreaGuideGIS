
/****** Object:  Table [dbo].[AreaGuide]    Script Date: 27/04/2015 23:41:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[User](
	[ID] [int] NOT NULL IDENTITY,
	[UserName] [varchar](max) NOT NULL,
	[Password] [varchar](max) NOT NULL,
	[Roles] [varchar](max) NULL
) ON [PRIMARY]

GO

ALTER TABLE dbo.[User] ADD CONSTRAINT pk_User PRIMARY KEY (ID)
GO

SET ANSI_PADDING OFF
GO
