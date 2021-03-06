﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PC.Database.Models.Users;
using Utils.Enums;

namespace PC.Database.Config.Users
{
    public class DbRoleConfiguration : IEntityTypeConfiguration<DbIdentityRole>
    {
        private static DbIdentityRole CreateRole(Role role, string uniqueId)
        {
            var roleAsString = role.ToString();
            return new DbIdentityRole
            {
                Id = (long)role,
                Name = roleAsString,
                NormalizedName = roleAsString.ToUpper(),
                ConcurrencyStamp = uniqueId,
                Role = role
            };
        }

        public void Configure(EntityTypeBuilder<DbIdentityRole> builder)
        {
            builder.HasData(
                CreateRole(Role.Employee, "b84d4fc4-e7ae-4db9-b158-88fa2380bda5"),
                CreateRole(Role.HRManager, "28788134-8fd8-4b31-9130-6cdd8ef567ef"),
                CreateRole(Role.TopManager, "e0987060-5be4-46a4-828a-06b01c94d720"),
                CreateRole(Role.SystemAdministrator, "b7c311ac-f236-45af-8e33-126ee74c67d3"),
                CreateRole(Role.System, "61cb018d-8deb-4bed-9056-206ded62a52d"));
        }
    }
}