using BlueGrass.PeopleDirectory.UI.Contracts.Admin;
using BlueGrass.PeopleDirectory.UI.Models;
using System;
using System.Threading.Tasks;
using BlueGrass.PeopleDirectory.Dapper.Repository.Contracts;
using Microsoft.Extensions.Configuration;
using BlueGrass.PeopleDirectory.Dapper.Repository.Models;
using BlueGrass.PeopleDirectory.UI.Utilities;
using System.Collections.Generic;
using System.Net.Mail;

namespace BlueGrass.PeopleDirectory.UI.Services.Admin
{
    public class AdminService : RepositoryBase, IAdminService
    {

        public AdminService(IDapperRepository dapperRepo, IConfiguration configuration) : base(dapperRepo, configuration)
        {

        }

        public async Task<int> AddPerson(AddPersonModel model)
        {
            try
            {
                _dbconnection.StoredProcedure = Constants.AddPeopleDetailsStoredProcedure;
                _dbconnection.Parameters = model;
                return await _dapperRepository.Execute(_dbconnection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> IsAdmin(AdminModel model)
        {
            try
            {
                _dbconnection.Parameters = model;
                _dbconnection.StoredProcedure = "spIsAdmin";
                int result = await _dapperRepository.Execute(_dbconnection);
                if (result == 0)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public  async Task<int> UpdatePerson(UpdatePersonModel model)
        {
            try
            {
                _dbconnection.StoredProcedure = Constants.UpdatePeopleDetailsStoredProcedure;
                _dbconnection.Parameters = model;
                return await _dapperRepository.Execute(_dbconnection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<IList<GetPersonsModel>> GetPeopleDetails()
        {
            try
            {
                _dbconnection.StoredProcedure = Constants.GetPeopleDetailsStoredProcedure;
                _dbconnection.Parameters = null;
                return await _dapperRepository.QueryList<GetPersonsModel>(_dbconnection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeletePerson(DeletePersonModel model)
        {
            try
            {
                _dbconnection.StoredProcedure = Constants.DeletePeopleDetailsStoredProcedure;
                _dbconnection.Parameters = model;
                return await _dapperRepository.Execute(_dbconnection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IList<GetCountryModel>> GetCountries()
        {
            try
            {
                _dbconnection.StoredProcedure = Constants.GetCountrysStoredProcedure;
                _dbconnection.Parameters = null;
                return await _dapperRepository.QueryList<GetCountryModel>(_dbconnection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IList<GetCityModel>> GetCities(GetCitiesByCountryIdModel model)
        {
            try
            {
                _dbconnection.StoredProcedure = Constants.GetCitysStoredProcedure;
                _dbconnection.Parameters = model;
                return await _dapperRepository.QueryList<GetCityModel>(_dbconnection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool SendEmail(EmailModel modal)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.IsBodyHtml = true;
                mail.From = new MailAddress(modal.FromAddress);
                mail.To.Add(modal.ToAddress);
                mail.Subject = modal.Subject;
                mail.Body = modal.Body;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("testingmr007@gmail.com", "Testingmr@7");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }

        }
    }
}
