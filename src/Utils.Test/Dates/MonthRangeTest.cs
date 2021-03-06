﻿using System;
using Utils.Dates;
using Xunit;

namespace Utils.Test.Dates
{
    public class MonthRangeTest
    {
        [Theory]
        [InlineData(1, 23)]
        [InlineData(2, 20)]
        [InlineData(8, 21)]
        public void WorkDaysCount_DifferentValues_Ok(int month, int daysExpected)
        {
            Assert.Equal(daysExpected, new MonthRange(2020, month).WorkDaysCount());
        }

        [Theory]
        [InlineData(1, 30, 30)]
        [InlineData(5, 20, 16)]
        [InlineData(1, 1, 1)]
        public void Ctor_SameMonths_Ok(int start, int end, int daysCountExpected)
        {
            var target = new MonthRange(
                new Date(2020, 6, start),
                new Date(2020, 6, end));

            Assert.Equal(2020, target.Year);
            Assert.Equal(6, target.Month);
            Assert.Equal(daysCountExpected, target.DaysCount);
        }

        [Fact]
        public void Ctor_DifferentMonths_Exception()
        {
            Assert.Throws<ArgumentException>(() => new MonthRange(
                new Date(2020, 6, 1),
                new Date(2020, 7, 5)));
        }

        [Fact]
        public void Ctor_SameMonthsDifferentYears_Exception()
        {
            Assert.Throws<ArgumentException>(() => new MonthRange(
                new Date(2020, 6, 1),
                new Date(2021, 6, 30)));
        }
    }
}