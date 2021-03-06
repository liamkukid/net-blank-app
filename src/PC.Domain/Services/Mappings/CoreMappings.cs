﻿using System.Collections.Generic;
using System.Reflection;
using AutoMapper;
using PC.Domain.Services.Mappings.Users;

namespace PC.Domain.Services.Mappings
{
    // TODO rename
    public static class CoreMappings
    {
        public static Assembly GetAssembly()
        {
            return typeof(CoreMappings).Assembly;
        }

        public static IEnumerable<Profile> GetProfiles()
        {
            yield return new ApplicationUserProfile();
            yield return new ApplicationUserRoleProfile();
            yield return new RoleProfile();
            yield return new UserClaimProfile();
        }
    }
}