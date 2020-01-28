using BlueGrass.PeopleDirectory.Dapper.Repository.Contracts;
using BlueGrass.PeopleDirectory.Dapper.Repository.Models;
using BlueGrass.PeopleDirectory.UI.Contracts;
using BlueGrass.PeopleDirectory.UI.Models;
using BlueGrass.PeopleDirectory.UI.Utilities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlueGrass.PeopleDirectory.UI.Services.People
{
    public class PeopleDirectoryService : RepositoryBase, IPeopleDirectoryService
    {
        public PeopleDirectoryService(IDapperRepository dapperRepository, IConfiguration configuration) : base(dapperRepository, configuration)
        {

        }
        
        public async Task<int> AddPeopleDetails(PeopleDetailsModel model)
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

        public async Task<int> DeletePeopleDetails(PeopleDetailsByIdModel model)
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

        public async Task<IList<PeopleDetailsModel>> GetPeopleDetails()
        {
            try
            {
                _dbconnection.StoredProcedure = Constants.GetPeopleDetailsStoredProcedure;
                _dbconnection.Parameters = null;
                return await _dapperRepository.QueryList<PeopleDetailsModel>(_dbconnection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IList<PeopleDetailsModel>> GetPeopleDetailsById(PeopleDetailsByIdModel model)
        {
            try
            {
                _dbconnection.StoredProcedure = Constants.GetPeopleDetailsByIdStoredProcedure;
                _dbconnection.Parameters = model;
                return await _dapperRepository.QueryList<PeopleDetailsModel>(_dbconnection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdatePeopleDetails(PeopleDetailsModel model)
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
    }
}
