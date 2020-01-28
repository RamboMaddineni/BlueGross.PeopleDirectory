using BlueGrass.PeopleDirectory.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlueGrass.PeopleDirectory.UI.Contracts.Admin
{
    public interface IAdminService
    {
        Task<bool> IsAdmin(AdminModel model);
        Task<int> AddPerson(AddPersonModel model);
        Task<int> UpdatePerson(UpdatePersonModel model);
        Task<int> DeletePerson(DeletePersonModel model);
        Task<IList<GetPersonsModel>> GetPeopleDetails();
        Task<IList<GetCountryModel>> GetCountries();
        Task<IList<GetCityModel>> GetCities(GetCitiesByCountryIdModel model);
        bool SendEmail(EmailModel modal);

    }
}
