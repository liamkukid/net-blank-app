﻿using System;
using System.Text.RegularExpressions;
using Utils.Exceptions;

namespace PC.Domain.Services.User
{
    public class EmailDomainValidatorService
    {
        private readonly Regex _emailDomainRegex;

        public EmailDomainValidatorService(string domains)
        {
            if (string.IsNullOrEmpty(domains))
            {
                throw new ArgumentException("Domains value is not valid", paramName: nameof(domains));
            }

            _emailDomainRegex = new Regex($@"^.+@({domains})$");
        }

        public void Validate(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentNullException(nameof(email), "You should not provide null value for email");
            }

            ValidateRegexEmail(email);
        }

        private void ValidateRegexEmail(string email)
        {
            if (!_emailDomainRegex.IsMatch(email))
            {
                throw new BadRequestException(
                    $"Cannot create new user '{email}' because of it's domain is not allowed");
            }
        }
    }
}