USE [master]
GO
/****** Object:  Database [PeopleDirectory]    Script Date: 2020/01/28 10:26:00 ******/
CREATE DATABASE [PeopleDirectory]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PeopleDirectory', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\PeopleDirectory.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PeopleDirectory_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\PeopleDirectory_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [PeopleDirectory] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PeopleDirectory].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PeopleDirectory] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PeopleDirectory] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PeopleDirectory] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PeopleDirectory] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PeopleDirectory] SET ARITHABORT OFF 
GO
ALTER DATABASE [PeopleDirectory] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PeopleDirectory] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PeopleDirectory] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PeopleDirectory] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PeopleDirectory] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PeopleDirectory] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PeopleDirectory] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PeopleDirectory] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PeopleDirectory] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PeopleDirectory] SET  DISABLE_BROKER 
GO
ALTER DATABASE [PeopleDirectory] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PeopleDirectory] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PeopleDirectory] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PeopleDirectory] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PeopleDirectory] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PeopleDirectory] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PeopleDirectory] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PeopleDirectory] SET RECOVERY FULL 
GO
ALTER DATABASE [PeopleDirectory] SET  MULTI_USER 
GO
ALTER DATABASE [PeopleDirectory] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PeopleDirectory] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PeopleDirectory] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PeopleDirectory] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PeopleDirectory] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'PeopleDirectory', N'ON'
GO
ALTER DATABASE [PeopleDirectory] SET QUERY_STORE = OFF
GO
USE [PeopleDirectory]
GO
/****** Object:  Table [dbo].[tblAdmins]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAdmins](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AdminName] [nvarchar](50) NOT NULL,
	[AdminPassword] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_tblAdmins] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCity]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCity](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CityName] [nvarchar](50) NOT NULL,
	[CountryId] [int] NOT NULL,
 CONSTRAINT [PK_tblCity] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCountry]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCountry](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_tblCountries] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblGender]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblGender](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Gender] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_tblGender] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPeoples]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPeoples](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[SurName] [nvarchar](50) NOT NULL,
	[ProfilePicture] [nvarchar](max) NOT NULL,
	[MobileNumber] [nvarchar](20) NOT NULL,
	[EmailAddress] [nvarchar](50) NOT NULL,
	[Gender] [int] NOT NULL,
	[City] [int] NOT NULL,
	[Country] [int] NOT NULL,
 CONSTRAINT [PK_tblPeoples] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[tblCity]  WITH CHECK ADD  CONSTRAINT [FK_Country_City] FOREIGN KEY([CountryId])
REFERENCES [dbo].[tblCountry] ([Id])
GO
ALTER TABLE [dbo].[tblCity] CHECK CONSTRAINT [FK_Country_City]
GO
ALTER TABLE [dbo].[tblPeoples]  WITH CHECK ADD  CONSTRAINT [FK_City_People] FOREIGN KEY([City])
REFERENCES [dbo].[tblCity] ([Id])
GO
ALTER TABLE [dbo].[tblPeoples] CHECK CONSTRAINT [FK_City_People]
GO
ALTER TABLE [dbo].[tblPeoples]  WITH CHECK ADD  CONSTRAINT [FK_Country_People] FOREIGN KEY([Country])
REFERENCES [dbo].[tblCountry] ([Id])
GO
ALTER TABLE [dbo].[tblPeoples] CHECK CONSTRAINT [FK_Country_People]
GO
ALTER TABLE [dbo].[tblPeoples]  WITH CHECK ADD  CONSTRAINT [FK_Gender_People] FOREIGN KEY([Gender])
REFERENCES [dbo].[tblGender] ([Id])
GO
ALTER TABLE [dbo].[tblPeoples] CHECK CONSTRAINT [FK_Gender_People]
GO
/****** Object:  StoredProcedure [dbo].[spAddCity]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spAddCity]
@CityName nvarchar(50),
@CountryId int
AS

BEGIN

SET NOCOUNT ON;

INSERT INTO tblCity(CityName,CountryId) VALUES(@CityName,@CountryId)
END
GO
/****** Object:  StoredProcedure [dbo].[spAddCountry]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spAddCountry]
@Name nvarchar(20)
AS

BEGIN

SET NOCOUNT ON;

INSERT INTO tblCountry(Name) VALUES(@Name)
END
GO
/****** Object:  StoredProcedure [dbo].[spAddPeopleDetails]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spAddPeopleDetails]
@Name nvarchar(50),
@SurName nvarchar(50),
@ProfilePicture nvarchar(max),
@MobileNumber nvarchar(20),
@Gender int,
@City int,
@Country int,
@EmailAddress nvarchar(50)

AS
BEGIN
SET NOCOUNT ON;
INSERT INTO tblPeoples(Name,SurName,ProfilePicture,MobileNumber,Gender,City,Country, EmailAddress)
VALUES(@Name,@SurName,@ProfilePicture,@MobileNumber,@Gender,@City,@Country, @EmailAddress)
END
GO
/****** Object:  StoredProcedure [dbo].[spDeletePeopleDetails]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spDeletePeopleDetails]
@Id int
AS

BEGIN

SET NOCOUNT ON;

DELETE FROM tblPeoples WHERE Id=@Id

END
GO
/****** Object:  StoredProcedure [dbo].[spGetAdminDetailsById]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[spGetAdminDetailsById]
@AdminName nvarchar(50),
@AdminPassword nvarchar(50)
As
Begin
SET NOCOUNT ON;

SELECT COUNT(*) FROM tblAdmins
WHERE AdminName=@AdminName and AdminPassword=@AdminPassword

End
GO
/****** Object:  StoredProcedure [dbo].[spGetCityByCountryId]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetCityByCountryId]
@CountryId int
AS
BEGIN
SET NOCOUNT ON;
SELECT Id, CityName, CountryId from tblCity where CountryId=@CountryId
END
GO
/****** Object:  StoredProcedure [dbo].[spGetCountries]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetCountries]
AS
BEGIN
SET NOCOUNT ON;
SELECT Id,Name from tblCountry
END
GO
/****** Object:  StoredProcedure [dbo].[spGetPeopleDetails]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetPeopleDetails]
AS
BEGIN
SET NOCOUNT ON;
SELECT P.Id,P.Name,P.SurName,P.ProfilePicture,P.MobileNumber,P.EmailAddress,G.Gender,C.CityName,C.Id AS CityId,COUNTRY.Id AS CountryId,COUNTRY.Name AS CountryName FROM tblPeoples P
INNER JOIN tblGender G ON P.Gender=G.Id
INNER JOIN tblCity C ON P.City=C.Id
INNER JOIN tblCountry COUNTRY ON P.Country=COUNTRY.Id 
END
GO
/****** Object:  StoredProcedure [dbo].[spGetPeopleDetailsById]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetPeopleDetailsById]
@Id int
AS
BEGIN
SET NOCOUNT ON;
SELECT P.Id,P.Name,P.SurName,P.ProfilePicture,P.MobileNumber,P.EmailAddress,G.Gender,C.CityName,C.Id AS CityId,COUNTRY.Name,COUNTRY.Id AS CountryId FROM tblPeoples P
INNER JOIN tblGender G ON P.Gender=G.Id
INNER JOIN tblCity C ON P.City=C.Id
INNER JOIN tblCountry COUNTRY ON P.Country=COUNTRY.Id 
WHERE P.Id=@Id
END
GO
/****** Object:  StoredProcedure [dbo].[spIsAdmin]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[spIsAdmin]
@AdminName nvarchar(50),
@AdminPassword nvarchar(50)
As
Begin
SET NOCOUNT ON;

SELECT COUNT(*) FROM tblAdmins
WHERE AdminName=@AdminName and AdminPassword=@AdminPassword

End
GO
/****** Object:  StoredProcedure [dbo].[spUpdatePeopleDetails]    Script Date: 2020/01/28 10:26:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spUpdatePeopleDetails]
@Id int,
@Name nvarchar(50),
@SurName nvarchar(50),
@ProfilePicture nvarchar(max),
@MobileNumber nvarchar(20),
@EmailAddress nvarchar(50),
@Gender int,
@City int,
@Country int

AS
BEGIN
SET NOCOUNT ON;
UPDATE tblPeoples SET Name=@Name,SurName=@SurName,ProfilePicture=@ProfilePicture,MobileNumber=@MobileNumber,EmailAddress=@EmailAddress,Gender=@Gender,City=@City,Country=@Country
WHERE Id=@Id
END
GO
USE [master]
GO
ALTER DATABASE [PeopleDirectory] SET  READ_WRITE 
GO
