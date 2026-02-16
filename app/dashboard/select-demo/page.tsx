'use client';

import { useState } from 'react';
import { Box, Heading, VStack, HStack, Text, Card } from '@chakra-ui/react';
import { AdvancedSelect, SelectOption } from '@/shared/components';

// Sample data
const fruits: SelectOption[] = [
  { value: 1, label: 'سیب', group: 'میوه‌های داخلی' },
  { value: 2, label: 'پرتقال', group: 'میوه‌های داخلی' },
  { value: 3, label: 'موز', group: 'میوه‌های وارداتی' },
  { value: 4, label: 'انبه', group: 'میوه‌های وارداتی' },
  { value: 5, label: 'انار', group: 'میوه‌های داخلی' },
  { value: 6, label: 'هلو', group: 'میوه‌های داخلی' },
  { value: 7, label: 'آناناس', group: 'میوه‌های وارداتی' },
  { value: 8, label: 'انگور', group: 'میوه‌های داخلی' },
];

const countries: SelectOption[] = [
  { value: 'ir', label: 'ایران' },
  { value: 'us', label: 'آمریکا' },
  { value: 'uk', label: 'انگلستان' },
  { value: 'de', label: 'آلمان' },
  { value: 'fr', label: 'فرانسه' },
  { value: 'jp', label: 'ژاپن' },
  { value: 'cn', label: 'چین' },
  { value: 'in', label: 'هند' },
];

// Generate large dataset for virtualization demo
const generateLargeDataset = (count: number): SelectOption[] => {
  return Array.from({ length: count }, (_, i) => ({
    value: i + 1,
    label: `آیتم شماره ${i + 1}`,
    group: i % 3 === 0 ? 'گروه A' : i % 3 === 1 ? 'گروه B' : 'گروه C',
  }));
};

const largeDataset = generateLargeDataset(1000);

export default function SelectDemoPage() {
  const [singleValue, setSingleValue] = useState<string | number>('');
  const [multiValue, setMultiValue] = useState<(string | number)[]>([]);
  const [groupedValue, setGroupedValue] = useState<(string | number)[]>([]);
  const [virtualizedValue, setVirtualizedValue] = useState<(string | number)[]>([]);

  return (
    <Box p={8}>
      <VStack gap={6} align="stretch" maxW="4xl" mx="auto">
        <Heading size="2xl" mb={4}>
          نمایش کامپوننت Select پیشرفته
        </Heading>

        {/* Single Select */}
        <Card.Root>
          <Card.Body>
            <VStack gap={4} align="stretch">
              <Heading size="lg">انتخاب تکی</Heading>
              <Text color="gray.600">
                یک گزینه را از لیست انتخاب کنید
              </Text>
              <AdvancedSelect
                options={countries}
                value={singleValue}
                onChange={setSingleValue}
                placeholder="کشور خود را انتخاب کنید"
                searchable
              />
              {singleValue && (
                <Text fontSize="sm" color="blue.600">
                  انتخاب شده: {countries.find(c => c.value === singleValue)?.label}
                </Text>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Multi Select */}
        <Card.Root>
          <Card.Body>
            <VStack gap={4} align="stretch">
              <Heading size="lg">انتخاب چندتایی</Heading>
              <Text color="gray.600">
                چند گزینه را همزمان انتخاب کنید
              </Text>
              <AdvancedSelect
                options={countries}
                value={multiValue}
                onChange={setMultiValue}
                multiple
                searchable
                showSelectAll
                placeholder="کشورها را انتخاب کنید"
              />
              {multiValue.length > 0 && (
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={2}>
                    انتخاب شده ({multiValue.length}):
                  </Text>
                  <HStack gap={2} flexWrap="wrap">
                    {multiValue.map((val) => {
                      const country = countries.find(c => c.value === val);
                      return (
                        <Box
                          key={val}
                          px={3}
                          py={1}
                          bg="blue.100"
                          color="blue.800"
                          borderRadius="full"
                          fontSize="sm"
                        >
                          {country?.label}
                        </Box>
                      );
                    })}
                  </HStack>
                </Box>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Grouped Select */}
        <Card.Root>
          <Card.Body>
            <VStack gap={4} align="stretch">
              <Heading size="lg">انتخاب با گروه‌بندی</Heading>  
              <AdvancedSelect
                options={fruits}
                value={groupedValue}
                onChange={setGroupedValue}
                multiple
                searchable
                showSelectAll
                placeholder="میوه‌ها را انتخاب کنید"
              />
              {groupedValue.length > 0 && (
                <Text fontSize="sm" color="blue.600">
                  {groupedValue.length} میوه انتخاب شده
                </Text>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Virtualized Select */}
        <Card.Root>
          <Card.Body>
            <VStack gap={4} align="stretch">
              <Heading size="lg">انتخاب با مجازی‌سازی</Heading>
              <AdvancedSelect
                options={largeDataset}
                value={virtualizedValue}
                onChange={setVirtualizedValue}
                multiple
                searchable
                showSelectAll
                virtualized
                placeholder="از 1000 آیتم انتخاب کنید"
              />
              {virtualizedValue.length > 0 && (
                <Text fontSize="sm" color="blue.600">
                  {virtualizedValue.length} آیتم از 1000 آیتم انتخاب شده
                </Text>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>

      </VStack>
    </Box>
  );
}
