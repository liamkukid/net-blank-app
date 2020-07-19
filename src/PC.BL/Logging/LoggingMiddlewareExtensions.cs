﻿using Microsoft.AspNetCore.Builder;

namespace PC.BL.Logging
{
    public static class LoggingMiddlewareExtensions
    {
        public static IApplicationBuilder UseApplicationLogger(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<LoggingMiddleware>();
        }
    }
}