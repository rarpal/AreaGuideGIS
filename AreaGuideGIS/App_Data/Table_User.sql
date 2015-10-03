/****** Object:  Table [dbo].[User]    Script Date: 01/10/2015 12:38:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[User](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](max) NOT NULL,
	[Password] [varchar](max) NOT NULL,
	[Roles] [varchar](max) NULL,
	[Email] [varchar](max) NULL,
	[salt] [varchar](max) NULL,
	[APPId] [varchar](max) NULL,
	[APIKey] [varchar](max) NULL,
 CONSTRAINT [pk_User] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


GO

SET ANSI_PADDING OFF
GO