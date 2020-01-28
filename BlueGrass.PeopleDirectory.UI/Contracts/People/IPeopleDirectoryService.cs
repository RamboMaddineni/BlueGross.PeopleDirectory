using BlueGrass.PeopleDirectory.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlueGrass.PeopleDirectory.UI.Contracts
{
    public interface IPeopleDirectoryService
    {
        
        Task<int> AddPeopleDetails(PeopleDetailsModel model);
        Task<IList<PeopleDetailsModel>> GetPeopleDetails();
        Task<IList<PeopleDetailsModel>> GetPeopleDetailsById(PeopleDetailsByIdModel model);
        Task<int> UpdatePeopleDetails(PeopleDetailsModel model);
        Task<int> DeletePeopleDetails(PeopleDetailsByIdModel model);

    }
}
